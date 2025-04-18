export * from './components/Printer';
export * from './components/Br';
export * from './components/Cashdraw';
export * from './components/Cut';
export * from './components/Line';
export * from './components/Text';
export * from './components/Raw';
export * from './components/Image';
export * from './components/QRCode';
export * from './components/Barcode';
export * from './components/Row';
export * from './render';
export * from './utils/textLength';
export * from './utils/wrapText';

export type {
  Align,
  TextFont,
  TextSize,
  TextUnderline,
  QRCodeOptions,
  BarcodeType,
  BarcodeOptions,
  CashDrawerPin,
  CharacterSet,
  PrinterType,
  DeserializedCommand,
  DeserializedCommandName,
} from '@react-thermal-printer/printer';
export {
  encode,
  decode,
  deserialize,
} from '@react-thermal-printer/printer';
