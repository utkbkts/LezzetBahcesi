import React from "react";
import { useGetUserOrderDetailQuery } from "../../redux/api/OrderApi";
import { useParams } from "react-router-dom";
import moroccan from "/moroccan-flower.png";
import logo from "/logo.png";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import moment from "moment";
import { Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
const Invoice = () => {
  const { id } = useParams();
  const { data } = useGetUserOrderDetailQuery(id);

  const handleDownload = () => {
    const input = document.getElementById("order_invoices");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF();

      const pdfWidth = pdf.internal.pageSize.getWidth();
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, 0);
      pdf.save(`lezzetbahcesi_${data?.order?._id}.pdf`);
    });
  };

  return (
    <div className="flex flex-col items-center mt-12">
      <Button type="primary" onClick={handleDownload}>
        <DownloadOutlined />
        Faturayı indir
      </Button>
      <div className="max-w-5xl mx-auto  h-full mt-24 border border-black/80">
        <div id="order_invoices">
          <div className="flex flex-col">
            <div className="flex items-center justify-center mt-12">
              <img src={logo} alt="" className="w-32 h-32 object-cover" />
            </div>
            <div className="mt-12 relative">
              <img
                src={moroccan}
                alt=""
                className="h-[10vh] w-full object-cover"
              />
              <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl font-bold whitespace-nowrap">
                Fatura ID:#{data?.order?._id}
              </h1>
            </div>
            <div className="flex w-full justify-between p-12">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span>Name:</span>
                  <span className="font-bold">
                    {data?.order?.shippingAddress?.contactName}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span>Email:</span>
                  <span className="font-bold">{data?.order?.user?.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>Telefon numarası:</span>
                  <span className="font-bold">
                    {" "}
                    {data?.order?.shippingAddress?.phoneNumber}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span>Adres:</span>
                  <span className="font-bold">
                    {data?.order?.shippingAddress?.address}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span>Tarih:</span>
                  <span className="font-bold">
                    {moment(data?.order?.updatedAt).format(
                      "DD MMMM YYYY HH:mm:ss"
                    )}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span>Durumu:</span>
                  <span className="font-bold">
                    {data?.order?.paymentInfo?.status}
                  </span>
                </div>
              </div>
              <div className="flex flex-col text-right">
                <h1>Lezzet Bahçesi</h1>
                <span>istanbul</span>
                <span className="w-44">
                  Emin Sinan, Kadırga Limanı Cd. No:85, 34130 Fatih/İstanbul
                </span>
                <a
                  href="mailto:info@lezzetbahcesi.com"
                  className="text-blue-600 underline"
                >
                  info@lezzetbahcesi.com
                </a>
              </div>
            </div>
          </div>
          {/* Fatura Detayları Tablosu */}
          <div className="px-12">
            <table className="table-auto w-full border-collapse border border-gray-300 mt-6">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-2">Ürün ID</th>
                  <th className="border border-gray-300 p-2">Ürün İsmi</th>
                  <th className="border border-gray-300 p-2">Fiyat</th>
                  <th className="border border-gray-300 p-2">Adet</th>
                  <th className="border border-gray-300 p-2">Toplam</th>
                </tr>
              </thead>
              <tbody>
                {data?.order?.basketItems.map((item) => (
                  <tr key={item._id}>
                    <td className="border border-gray-300 p-2">{item._id}</td>
                    <td className="border border-gray-300 p-2">{item.title}</td>
                    <td className="border border-gray-300 p-2">
                      {item.price.toFixed(2)}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {" "}
                      {item.quantity}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {data?.order?.totalAmount.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Subtotal, Tax, Shipping ve Grand Total */}
          <div className="flex justify-end p-12">
            <div className="w-1/2">
              <div className="flex justify-between py-2">
                <span>Ara toplam:</span>
                <span className="font-bold">
                  {" "}
                  {data?.order?.itemsPrice.toFixed(2)}₺
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span>Vergi (%20):</span>
                <span className="font-bold">
                  {data?.order?.taxAmount.toFixed(2)}₺
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span>Kurye:</span>
                <span className="font-bold">ücretsiz</span>
              </div>
              <div className="flex justify-between py-2 text-xl">
                <span>Toplam Tutar:</span>
                <span className="font-bold">
                  {data?.order?.totalAmount.toFixed(2)}₺
                </span>
              </div>
            </div>
          </div>
          <div className="p-12 border-t border-gray-300">
            <p className="text-sm text-gray-600">
              Bu fatura Lezzet Bahçesi adına düzenlenmiştir. Vergi No:
              1234567890 - Vergi Dairesi: İstanbul. Bu fatura yasal bir belgedir
              ve ödemenin alındığını gösterir.
            </p>
            <p className="text-sm text-gray-600 mt-2">
              İade ve değişim politikamız hakkında daha fazla bilgi için lütfen{" "}
              <a href="/returns" className="text-blue-600 underline">
                iade koşullarımızı
              </a>{" "}
              inceleyin veya bize
              <a
                href="mailto:info@lezzetbahcesi.com"
                className="text-blue-600 underline"
              >
                {" "}
                info@lezzetbahcesi.com
              </a>{" "}
              adresinden ulaşın.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
