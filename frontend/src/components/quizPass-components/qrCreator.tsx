import { QRCodeCanvas } from "qrcode.react";
type QRCreatorProps = {
  link: string;
};

export function QRGenerator({ link }: QRCreatorProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <QRCodeCanvas
        value={link}
        size={150}
        fgColor="#4f46e5"
        bgColor="#f3f4f6"
        level="H"
      />
      <p className="text-sm text-gray-600">Scan me!</p>
    </div>
  );
}
