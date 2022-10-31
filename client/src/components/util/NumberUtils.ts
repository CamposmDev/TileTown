const formatToSocialStr = (n: number, prefix?: string): string => {
    if (n >= 1_000_000_000_000) return (n / 1_000_000_000_000).toFixed(1) + 'T ' + ((prefix) ? prefix : '')
    if (n >= 1_000_000_000) return (n / 1_000_000_000).toFixed(1) + 'B ' + ((prefix) ? prefix : '')
    if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M ' + ((prefix) ? prefix : '')
    if (n >= 1000) return (n / 1000).toFixed(1) + 'K ' + ((prefix) ? prefix : '')
    return n.toFixed(0) + ' ' + ((prefix) ? prefix : '')
}

export { formatToSocialStr }