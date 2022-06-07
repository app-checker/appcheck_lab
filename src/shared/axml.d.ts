declare function analyse(buffer: Buffer): any
declare function parse<T>(buffer: Buffer): T
declare function convert(buffer: Buffer): any

export { analyse, parse, convert }