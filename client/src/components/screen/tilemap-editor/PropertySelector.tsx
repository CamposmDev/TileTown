import { TilemapEditContext } from "src/context/tilemapEditor";
import { useContext } from "react";
import { Property } from "src/context/tilemapEditor/TilemapEditTypes";
import { Stack } from "@mui/material";
import IntegerPropertyField from "./IntegerPropertyField";
import BooleanPropertyField from "./BooleanPropertyField";
import FloatPropertyField from "./FloatPropertyField";
import StringPropertyField from "./StringPropertyField";
import ColorPropertyField from "./ColorPropertyField";

const PropertySelector = () => {
  const edit = useContext(TilemapEditContext);
  const currentLayerIndex = edit.state.currentLayerIndex;
  const properties: Property[] =
    currentLayerIndex === -1
      ? edit.state.Tilemap.properties
      : edit.state.Tilemap.layers[currentLayerIndex].properties;

  const propertyFields = (
    <Stack spacing={2} direction="column">
      {properties.map((property: Property, index: number) => {
        switch (property.ptype) {
          case "bool": {
            const value = property.value === "true" ? property.value : "false";
            return (
              <BooleanPropertyField
                name={property.name}
                value={value}
                type={property.ptype}
                index={index}
                key={"uniqueKeyID" + index}
              ></BooleanPropertyField>
            );
          }
          case "int": {
            return (
              <IntegerPropertyField
                name={property.name}
                value={property.value}
                type={property.ptype}
                index={index}
                key={"uniqueKeyID" + index}
              ></IntegerPropertyField>
            );
          }
          case "float": {
            return (
              <FloatPropertyField
                name={property.name}
                value={property.value}
                type={property.ptype}
                index={index}
                key={"uniqueKeyID" + index}
              ></FloatPropertyField>
            );
          }
          case "string": {
            return (
              <StringPropertyField
                name={property.name}
                value={property.value}
                type={property.ptype}
                index={index}
                key={"uniqueKeyID" + index}
              ></StringPropertyField>
            );
          }
          case "color": {
            return (
              <ColorPropertyField
                name={property.name}
                value={property.value}
                type={property.ptype}
                index={index}
                key={"uniqueKeyID" + index}
              ></ColorPropertyField>
            );
          }
        }
      })}
    </Stack>
  );

  return <div>{propertyFields}</div>;
};

export default PropertySelector;
