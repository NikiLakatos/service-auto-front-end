import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ClientCard } from "../components/ClientCard";
import { userActions, clientActions } from "../actions";
import styles from "./HomePage.scss";

export function HomePage() {
  const user = useSelector((state) => state.authentication.user);
  const clients = useSelector((state) => state.clients);
  const dispatch = useDispatch();
  const [searchWord, setSearchWord] = useState("");

  useEffect(() => {
    dispatch(clientActions.getClientsForUser(user.id));
  }, []);

  useEffect(() => {
    if (clients && clients.displayedClients) {
      const newDisplayClientList = clients.displayedClients.filter((client) =>
        client.clientName.toLowerCase().includes(searchWord)
      );
      dispatch(clientActions.filterDisplayClients(newDisplayClientList));
    }

    if (searchWord === "") {
      dispatch(clientActions.filterDisplayClients(clients.items));
    }
  }, [searchWord]);

  return (
    <div className={styles.homePageContent}>
      <div
        style={{
          height: "10rem",
          backgroundColor: "#e9ecef",
          textAlign: "center",
          verticalAlign: "center",
        }}
      >
        <div style={{ paddingTop: "4rem" }}>
          <input
            style={{ width: "30rem" }}
            type="text"
            name="search"
            value={searchWord}
            placeholder="Search..."
            onChange={(e) => setSearchWord(e.target.value)}
          />
        </div>
      </div>

      <button
        type="button"
        className="btn btn-primary"
        style={{ position: "absolute", left: "1rem", top: "8rem" }}
      >
        <Link to="/AddClient" style={{ color: "white" }}>
          AddClient
        </Link>
      </button>
      <div className="container-fluid">
        {clients.displayedClients && (
          <div className="row mt-5 justify-content-center">
            {clients.displayedClients.map((client, index) => (
              <div className="card card-custom mx-2 mb-3" key={index}>
                <ClientCard client={client} userId={user.id} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
