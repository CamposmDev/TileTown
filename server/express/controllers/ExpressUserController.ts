import { Request, Response } from 'express';

import { User } from '@types';
import { db } from '../../database';
import { HashingUtils } from "../../util";
import { Auth } from '../middleware';
import { Mailer } from '../../util/mail';

export default class UserController {


    public async getUserById(req: Request, res: Response): Promise<void> {

        /** If there isn't an id in the url params return 400 - Bad Request */
        if (!req || !req.params || !req.params.id) {
            res.status(400).json({ message: "Bad request" });
            return;
        }

        /** If there isn't a user in the database with the id return 404 - Not Found */
        let id: string = req.params.id;
        let user: User | null = await db.users.getUserById(id);
        if (user === null) {
            res.status(404).json({ message: `User with id '${id}' does not exist` });
            return;
        }

        /** Otherwise return all the data about the user back to the client */
        res.status(200).json({ message: `Found user with id '${id}'!`, user: user });
        return;
    }
    public async getLoggedIn(req: Request, res: Response): Promise<Response> {
        if (!req || !res) {
            return res.status(400).json({ message: "Bad request" });
        }
        if (!req.userId) {
            return res.status(400).json({ message: "Missign user id" });
        }

        let user = await db.users.getUserById(req.userId);
        if (user === null) {
            return res.status(404).json({ message: "No user found" });
        }
        return res.status(200).json({ message: "User is logged in", user: user });
    }

    public async getUsers(req: Request, res: Response): Promise<Response> {
        if (!req) {
            return res.status(400).json({message: "Bad Request!"});
        }
        if (!req.body) {
            return res.status(400).json({message: "No query options"});
        }
        if (!req.body.username) {
            return res.status(400).json({message: "Query cannot be empty!"})
        }

        let username = req.body.username ? req.body.username.toString() : "";
        let users = await db.users.getUsers(username);
        if (users.length === 0) {
            return res.status(404).json({message: `No users found with username "${username}"`});
        }
        return res.status(200).json({message: `Found ${users.length} user(s)!`, users: users});
    }

    public async createUser(req: Request, res: Response): Promise<Response> {
        if (!req || !req.body) {
            return res.status(400).json({ message: "Bad Request" });
        }

        if (!req.body.firstName) {
            return res.status(400).json({ message: "User missing required field 'first name'" });
        }
        if (!req.body.lastName) {
            return res.status(400).json({ message: "User missing required field 'last name'" });
        }
        if (!req.body.email) {
            return res.status(400).json({ message: "User missing required field 'email'" });
        }
        if (!req.body.username) {
            return res.status(400).json({ message: "User missing required field 'username'" });
        }
        if (!req.body.password) {
            return res.status(400).json({ message: "User missing required field 'password'" });
        }

        let existingEmail = await db.users.getUserByEmail(req.body.email);
        if (existingEmail !== null) {
            return res.status(400).json({ message: `User with email '${req.body.email}' already exists` });
        }

        let existingUsername = await db.users.getUserByUsername(req.body.username);
        if (existingUsername !== null) {
            return res.status(400).json({ message: `User with username '${req.body.username}' already exists` });
        }

        if (req.body.password.length < 12) {
            return res.status(400).json({ message: `Password must be at least 12 characters` });
        }

        let hashedPassword = await HashingUtils.hash(req.body.password);
        let user: User | null = await db.users.createUser({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email
        });

        if (user === null) {
            return res.status(500).json({ message: "Server Error" });
        }

        // Email verification system... need to experiment with this a little
        try {
            await Mailer.sendMail({
                to: user.email, 
                from: "tiletown123@gmail.com", 
                subject: "Verify your TileTown Account", 
                text: `http://209.151.154.164/api/user/verify/${user.id}`,
            });
        } catch {
            return res.status(400).json({ message: `That doesn't look like a valid email address...`});
        }

        return res.status(201).json({ message: "User created successfully!", user: user });
    }

    public async loginUser(req: Request, res: Response): Promise<Response> {
        if (!req || !req.body) {
            return res.status(400).json({ message: "Bad request!" });
        }

        if (!req.body.email) {
            return res.status(400).json({ message: "Missing required field 'email/username'" });
        }
        if (!req.body.password) {
            return res.status(400).json({ message: "Missing required field 'password'" });
        }

        // Check the user exists - if not return error
        let user: User | null = await db.users.getUserByEmail(req.body.email);
        if (user === null) {
            user = await db.users.getUserByUsername(req.body.email);
            if (user === null) {
                return res.status(400).json({ message: `No user registered wth email/username '${req.body.email}'` });
            }
        }

        if (!user.isVerified) {
            return res.status(400).json({ message: `This account has not been verified`});
        }

        if (!user.isVerified) {
            return res.status(400).json({ message: `This account has not been verified`});
        }

        // Check the users password matches - if they don't match throw an error
        let match = await HashingUtils.compare(req.body.password, user.password);
        if (!match) {
            return res.status(400).json({ message: `Wrong password` });
        }

        // If user exists and passwords match give the user a signed token 
        let token: string = Auth.signJWT<string>(user.id);

        return res.status(200).
            cookie("token", token, { httpOnly: true, expires: new Date(Date.now() + 900000) }).
            json({ message: "User successfully logged in!", user: user });
    }
    public async logoutUser(req: Request, res: Response): Promise<void> {
        if (!req.userId) {
            res.status(401).send({ message: "Unauthorized" });
            return;
        }
        res.status(200).clearCookie("token").json({ message: "User successfully logged out!" });
        return;
    }

    public async updateUserPassword(req: Request, res: Response): Promise<void> {
        if (!req || !req.body) {
            res.status(400).json({ message: "Bad Request" });
            return;
        }

        if (!req.userId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        if (!req.body.oldPassword) {
            res.status(400).json({ message: "Missing field `old password`" });
            return;
        }
        if (!req.body.newPassword) {
            res.status(400).json({ message: "Missing field `new password`" });
            return;
        }

        // Try and get the user with the user id
        let user = await db.users.getUserById(req.userId);
        if (user === null) {
            res.status(500).json({ message: "Server Error" });
            return;
        }

        // Check to see if the old password matches the users password
        let match = await HashingUtils.compare(req.body.oldPassword, user.password);
        if (!match) {
            res.status(400).json({ message: "Current password does not match the users current password on record" });
            return;
        }

        if (req.body.newPassword.length < 12) {
            res.status(400).json({ message: "New password must be at least 12 characters long" });
            return;
        }

        if (req.body.oldPassword.localeCompare(req.body.newPassword) === 0) {
            res.status(400).json({ message: "New password is same as old password" });
            return;
        }

        // Hash the users new password
        let hash = await HashingUtils.hash(req.body.newPassword);

        // Update the user with the new password
        let newUser: User | null = await db.users.updateUser(req.userId, { password: hash });
        if (newUser === null) {
            res.status(500).json({ message: "Server Error" });
            return;
        }

        res.status(200).json({ message: "Password updated successfully" });
        return;
    }
    public async updateUserEmail(req: Request, res: Response): Promise<void> {
        if (!req || !req.body) {
            res.status(400).json({ message: "Bad request" });
            return;
        }
        if (!req.userId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        if (!req.body.email) {
            res.status(400).json({ message: "Missing required field email" });
            return;
        }

        // Check if a user with the new email exists that isn't the current user
        let existingEmail = await db.users.getUserByEmail(req.body.email);
        if (existingEmail !== null) {
            if (existingEmail.id === req.userId) {
                res.status(400).json({ message: `User is already registered to this email address` });
            } else {
                res.status(400).json({ message: `User with email '${req.body.email}' already registered to another user` });
            }
            return;
        }

        // TODO: Generate email verification key here

        // Update the user with a new email
        let updatedUser = await db.users.updateUser(req.userId, { email: req.body.email });
        if (updatedUser === null) {
            res.status(500).json({ message: `Server Error` });
            return;
        }

        // TODO: Send an email verification to the email address here

        res.status(200).json({ message: "Email successfully changed!", email: updatedUser.email });
        return;
    }
    public async updateUserUsername(req: Request, res: Response): Promise<void> {
        if (!req || !req.body) {
            res.status(400).json({ message: "Bad Request" });
            return;
        }
        if (!req.userId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        // Check to make sure the body has a username
        if (!req.body.username) {
            res.status(400).json({ message: "Missing required field: 'username'" });
            return;
        }

        // Check to make sure a user with the new username doesn't already exists
        let existingUser = await db.users.getUserByUsername(req.body.username);
        if (existingUser !== null) {
            res.status(400).json({ message: `User with username '${req.body.username}' already exists` });
            return;
        }

        // If the username isn't taken - update the users username
        let updatedUser = await db.users.updateUser(req.userId, { username: req.body.username });
        if (updatedUser === null) {
            res.status(500).json({ message: "Server error" });
            return;
        }

        res.status(200).json({ message: "Username updated successfully!", username: updatedUser.username });
        return;
    }

    public async verifyUser(req: Request, res: Response): Promise<Response> {
        if (!req || !req.params) {
            return res.status(400).json({ message: "Bad Request" });
        }
        if (!req.params.id) {
            return res.status(400).json({ message: "No verification key provided" });
        }

        // Get the user with the verification key from the database
        let user = await db.users.getUserById(req.params.id);
        if (user === null) {
            return res.status(400).json({ message: "User with verification key does not exist" });
        }

        // Verify the user
        let verifiedUser = await db.users.updateUser(req.params.id, { isVerified: true });
        if (verifiedUser === null) {
            return res.status(500).json({ message: "Server Error" });
        }

        return res.status(200).send(`
            <div>
                Hello ${verifiedUser.firstName}! You've successfully verified your TileTown account!
                <a src="/login">Login</a>
            </div>
        `);
    }

    public async resetPassword(req: Request, res: Response): Promise<Response> {
        if (!req || !req.body) {
            return res.status(400).json({ message: "Bad Request" });
        }
        if (!req.body.email) {
            return res.status(400).json({ message: "Missing email" });
        }
        
        let user = await db.users.getUserByEmail(req.body.email);
        if (user === null) {
            return res.status(404).json({ message: `No user found`});
        }

        let password = (Math.floor(Math.random()*999999999999)).toString();
        let hash = await HashingUtils.hash(password);

        console.log(password);
        let updatedUser = await db.users.updateUser(user.id, {password: hash});
        if (updatedUser === null) {
            return res.status(500).json({ message: `Error updating users password`});
        }

        try {
            await Mailer.sendMail({
                to: updatedUser.email, 
                from: "tiletown123@gmail.com", 
                subject: "Verify your TileTown Account", 
                text: `Hello ${updatedUser.username}! Your temporary tiletown password has been changed to ${password}. Remember to change your password when you log in!`,
            });
        } catch {
            return res.status(400).json({ message: `That doesn't look like a valid email address...`});
        }

        return res.status(200).json({ message: "Password reset email sent!"});
    }

    public async deleteUserById(req: Request, res: Response): Promise<void> {
        if (!req || !req.body) {
            res.status(400).json({ message: "Bad Request" });
            return;
        }
        if (!req.userId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        // Check and see if the user exists in the database
        let user = await db.users.getUserById(req.userId);
        if (user === null) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        // If user exists, try deleting the user
        let deleted = await db.users.deleteUser(req.userId);
        if (!deleted) {
            res.status(500).json({ message: "Server Error" });
            return;
        }

        // Return info on deleted user
        res.status(200).clearCookie("token").json({ message: "User deleted successfully!", user: user });
        return;
    }
    public async updateUserProfile(req: Request, res: Response): Promise<Response> {
        if (!req) {
            return res.status(400).json({ message: "Bad request" });
        }
        if (!req.userId) {
            return res.status(400).json({ message: "Missing user id" });
        }
        if (!req.file) {
            return res.status(400).json({ message: "Missing file data" });
        }

        let user = await db.users.getUserById(req.userId);
        if (user === null) {
            return res.status(404).json({ message: "User not found" });
        }

        let updatedUser = await db.users.updateUser(user.id, {imageURL: req.file.filename});
        if (updatedUser === null) {
            return res.status(500).json({ message: "Error updating user's profile picture"});
        }

        return res.status(200).json({message: "Updated user profile picture!", user: updatedUser});
    }


    public async addFriend(req: Request, res: Response): Promise<Response> {
        // Check for bad request
        if (!req || !req.params) {
            return res.status(400).json({ message: "Bad Request"});
        }
        if (!req.params.id) {
            return res.status(400).json({ message: "Missing friend id"});
        }
        if (!req.userId) {
            return res.status(400).json({ message: "Missing user id"});
        }

        // Check if the user exists
        let user = await db.users.getUserById(req.userId);
        if (user === null) {
            return res.status(404).json({ message: `User ${req.userId} not found`});
        }

        // Check if the friend exists
        let friend = await db.users.getUserById(req.params.id);
        if (friend === null) {
            return res.status(404).json({ message: `User ${req.params.id} not found`});
        }

        // Check if the user is already friends with the other user
        let idx = user.friends.indexOf(friend.id);
        if (idx !== -1) {
            return res.status(400).json({ message: `User ${user.id} is already friends with user ${friend.id}`});
        }

        // Add the friend to the users friend list
        user.friends.push(friend.id);

        // Update the users friends list in the database
        let updatedUser = await db.users.updateUser(user.id, {friends: user.friends});
        if (updatedUser === null) {
            return res.status(500).json({ message: `Error updating user ${user.id}`});
        }
        // Return the updated friend
        return res.status(200).json({ message: `Friend added!`, user: updatedUser });
    }
    public async removeFriend(req: Request, res: Response): Promise<Response> {
        // Check for bad request format
        if (!req || !req.params) {
            return res.status(400).json({ message: "Bad Request"});
        }
        if (!req.params.id) {
            return res.status(400).json({ message: "Missing friend id"});
        }
        if (!req.userId) {
            return res.status(400).json({ message: "Missing user id"});
        }

        // Check if the user exists
        let user = await db.users.getUserById(req.userId);
        if (user === null) {
            return res.status(404).json({ message: `User ${req.userId} not found`});
        }
        // Check if the friend exists
        let friend = await db.users.getUserById(req.params.id);
        if (friend === null) {
            return res.status(404).json({ message: `User ${req.params.id} not found`});
        }

        // Check if user is friends with the friend
        let idx = user.friends.indexOf(friend.id);
        if (idx === -1) {
            return res.status(400).json({ message: `User ${req.params.id} is not friends with user ${friend.id}`});
        }

        // Remove the friend
        user.friends.splice(idx, 1);

        // Update the users friends list
        let updatedUser = await db.users.updateUser(user.id, {friends: user.friends});
        if (updatedUser === null) {
            return res.status(500).json({ message: `Error updating user ${user.id}`});
        }

        // Return the updated user
        return res.status(200).json({message: "Friend removed!", user: updatedUser});

    }

    public async getUnpublishedTilesets(req: Request, res: Response): Promise<Response> {
        if (!req) {
            return res.status(400).json({ message: "Bad Request" });
        }
        if (!req.userId) {
            return res.status(400).json({ message: "Missing user id"});
        }

        let tilesets = await db.tilesets.getTilesets({owner: req.userId, isPublished: false});
        if (tilesets.length === 0) {
            return res.status(404).json({ message: "User has no unpublished tilesets"});
        }

        return res.status(200).json({ message: "Found users unpublished tilesets!", tilesets: tilesets});
    }
}