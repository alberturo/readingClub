import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  clearCollectionsErrors,
  selectUserCollections,
  thunkGetUserCollections,
} from "../../redux/collection";
import "./UserCollection.css";
import CollectionCard from "./CollectionCard";
import CreateCollectionModal from "../CreateCollectionModal";
import OpenModalButton from "../OpenModalButton/OpenModalButton";

function UserCollection() {
  const dispatch = useDispatch();
  const collections = useSelector(selectUserCollections);
  const [responseMsg, setResponseMsg] = useState({});

  useEffect(() => {
    dispatch(thunkGetUserCollections());
  }, [dispatch]);

  return (
    <div className="user-collections">
      <h1 style={{ color: "#ef7e6b", fontFamily: "Delius" }}>My Collections</h1>
      <div className="res-msg" onClick={() => setResponseMsg({})}>
        {responseMsg?.message && <p>{responseMsg.message}</p>}
      </div>
      <div className="cards-container">
        {collections.length > 0 &&
          collections.map((collection) => (
            <CollectionCard
              key={collection.id}
              collection={collection}
              setResponseMsg={setResponseMsg}
            />
          ))}
        <div id="create-collection">
          <OpenModalButton
            buttonText="+"
            modalComponent={<CreateCollectionModal />}
            onModalClose={() => dispatch(clearCollectionsErrors())}
          />
        </div>
      </div>
    </div>
  );
}

export default UserCollection;
