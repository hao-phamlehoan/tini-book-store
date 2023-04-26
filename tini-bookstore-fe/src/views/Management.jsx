import { useEffect, useState } from "react";
import callApi from "../api/callApi";



// - Waiting: Đang chờ được phê duyệt.
// - Shipping: Đang vận chuyển.
// - Done: Đơn hàng hoàn thành.
// - Cancelled: Đơn hàng đã bị hủy bỏ.


export default function Management() {

  const init = {
    "b_id": "",
    "b_time": "13/12/2022 16:00",
    "city": "Hồ Chí Minh",
    "district": "Quận 1",
    "streetnum": "32 Đinh Tiên Hoàng",
    "b_status": "Waiting",
    "phone": "0982740845",
    "email": "sdfa@gmail.com",
    "customer_name": "",
    "payment_method": "Banking",
    "include": []
  };

  const [bills, setBills] = useState([init])


  const [loading, setLoading] = useState(true);

  const [value, setValue] = useState(init.b_status);

  const handleSelect = async (id, status) => {
    const bill = bills.filter(el => el["b_id"] === id)[0]
    bill["b_status"] = status
    setBills([...bills])
    console.log(bill["b_status"])
    await callApi.updateState({
      "b_id": id,
      "b_status": status || "Waiting"
    });
  }

  useEffect(() => {
    const fetchBill = async () => {
      try {
        var getBills = await callApi.getBill();
        setBills(getBills);
        console.log(getBills)
        setLoading(false);
      } catch (error) {
        console.log("Failed to fetch: ", error);
      }
    }

    fetchBill();
  }, [loading])

  return (
    <div className="bg-gray-100 py-2">
      <div className="container-fluid mx-5 my-5">
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            {/* <!-- head --> */}
            <thead>
              <tr>
                <th>Mã hoá đơn</th>
                <th>Tên khách hàng</th>
                <th>Email</th>
                <th>Số điện thoại</th>
                <th>Ngày đặt hàng</th>
                <th>Khu vực</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {/* <!-- row --> */}
              {
                bills.map((el, _) => <tr key={_}>
                  <th className="truncate max-w-0 ">{el["b_id"]}</th>
                  <th>{el["customer_name"]}</th>
                  <th>{el["email"]}</th>
                  <th>{el["phone"]}</th>
                  <th>{el["b_time"]}</th>
                  <th className="max-w-1">{el["streetnum"]}, {el["district"]}, {el["city"]}</th>
                  <th>
                    <div className="dropdown dropdown-bottom dropdown-end">
                      <label tabIndex={0} className="btn m-1">{el["b_status"]}</label>
                      <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                        {
                          ["Waiting", "Shipping", "Done", "Cancelled"].map((e, _) => e === el["b_status"]
                            ? <li key={_}><a>{e}</a></li>
                            : <li onClick={(event) => {
                              handleSelect(el["b_id"], e);
                              event.preventDefault();
                            }}><a>{e}</a></li>)
                        }
                      </ul>
                    </div>
                  </th>
                </tr>)
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}