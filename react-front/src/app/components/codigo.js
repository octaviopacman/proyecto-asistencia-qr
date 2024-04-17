import React, { useEffect, useRef } from 'react';
import QRCode from 'qrcode-generator';

function QRCodeComponent({ data }) {
    const qrCodeRef = useRef(null);

    useEffect(() => {
        if (qrCodeRef.current) {
            const qr = QRCode(0, 'M');
            qr.addData(data);
            qr.make();
            qr.createImgTag(5, 10, 'qr-code');
            qrCodeRef.current.innerHTML = qr.createImgTag(5, 10);
        }
    }, [data]);

    return (
        <div ref={qrCodeRef} />
        
    );
}

export default QRCodeComponent;
