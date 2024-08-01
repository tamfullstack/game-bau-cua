import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { cuoc, lamMoi, xoc } from "./store";

export default function App() {
  const { tienThuong, mangXuatHien, mangCuoc } = useSelector((state) => state);
  const dispatch = useDispatch();

  const renderQuanXuatHien = () => {
    return mangXuatHien.map((quanXuatHien, index) => {
      return (
        <div className="col-4" key={index}>
          <img
            src={`img/${quanXuatHien}.png`}
            alt={quanXuatHien}
            className="quan-xuat-hien"
          />
        </div>
      );
    });
  };

  const renderQuanCuoc = () => {
    const renderNutCuoc = (id, tangGiam) => {
      return (
        <button
          className="btn btn-warning"
          onClick={() => {
            dispatch(cuoc({ id, tangGiam }));
          }}
        >
          {tangGiam ? "+" : "-"}
        </button>
      );
    };

    return mangCuoc.map((quanCuoc, index) => {
      return (
        <div className="mt-4 col-4" key={index}>
          <img
            src={`img/${quanCuoc.id}.png`}
            alt={quanCuoc.id}
            className="quan-cuoc"
          />
          <div className="mt-2">
            {renderNutCuoc(quanCuoc.id, true)}
            <span> ${quanCuoc.tienCuoc.toLocaleString()} </span>
            {renderNutCuoc(quanCuoc.id, false)}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="app">
      <div className="container text-center text-warning">
        <h1 className="mt-5">GAME BẦU CUA</h1>
        <div className="mt-5">
          <div>Tiền thưởng: ${tienThuong.toLocaleString()}</div>
          <button
            className="mt-2 btn btn-success"
            onClick={() => {
              dispatch(lamMoi());
            }}
          >
            Làm mới
          </button>
        </div>
        <div className="mt-5">
          <div className="row">
            <div className="col-4" />
            <div className="col-4">
              <div className="row">{renderQuanXuatHien()}</div>
            </div>
          </div>
          <button
            className="mt-2 btn btn-warning"
            onClick={() => {
              dispatch(xoc());
            }}
          >
            Xóc
          </button>
        </div>
        <div className="mt-5 row">{renderQuanCuoc()}</div>
      </div>
    </div>
  );
}
