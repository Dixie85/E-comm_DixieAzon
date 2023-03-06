import { Link } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const STORE_URL = "/api/store/";

export default function StoreOverview({ storeInfo, setStoresDBUpdated }) {
  const axiosPrivate = useAxiosPrivate();

  const onStoreDelete = async () => {
    try {
      const response = await axiosPrivate.delete(
        STORE_URL + storeInfo.uniqueStoreId
      );
      setStoresDBUpdated((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <article className="flex mr-2 my-2 p-2 flex-col flex-wrap border rounded-md max-w-[140px] md:max-w-[200px] lg:max-w-[240px] bg-white shadow-md">
      <h3 className="text-xs text-stone-500/80">
        StoreName: <br />{" "}
        <span className="p-1 text-sm text-indigo-600 ">{storeInfo.name}</span>
      </h3>
      <p className="text-xs  text-stone-500/80">
        StoreId: <br />{" "}
        <span className="p-1 text-sm text-yellow-600 ">
          {storeInfo.uniqueStoreId}
        </span>
      </p>
      <Link
        to={`/admin/super/store/${storeInfo.uniqueStoreId}`}
        className="mt-1 text-xs  text-stone-500/80"
      >
        Go to "<span className="italic text-sm text-orange-400 hover:text-red-500 active:text-blue-500">{storeInfo.name}</span>"
      </Link>
      <button
        onClick={onStoreDelete}
        className="mt-2 border rounded-md text-sm  hover:bg-red-500/90 hover:text-gray-100 hover:shadow-md"
      >
        Delete Store
      </button>
    </article>
  );
}
