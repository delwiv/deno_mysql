import { BufferReader } from "../../buffer.ts";
import { Connection } from "../../connection.ts";
import ServerCapabilities from "../../consttants/capabilities.ts";

/** @ignore */
export interface ErrorPacket {
  code: number;
  sqlStateMarker?: number;
  sqlState?: number;
  message: string;
}

/** @ignore */
export function parseError(
  reader: BufferReader,
  conn: Connection
): ErrorPacket {
  const code = reader.readUint16();
  const packet: ErrorPacket = {
    code,
    message: ""
  };
  if (conn.capabilities & ServerCapabilities.CLIENT_PROTOCOL_41) {
    packet.sqlStateMarker = reader.readUint8();
    packet.sqlState = reader.readUints(5);
  }
  packet.message = reader.readNullTerminatedString();
  return packet;
}
