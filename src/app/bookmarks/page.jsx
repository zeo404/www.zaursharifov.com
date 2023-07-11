"use client";

import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";

export default function Bookmarks() {
  const [selected, setSelected] = useState("Tools");
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/cljr5v0nv09y901tc4sb456vd/master", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `{
          bookmarks {
            desc
            id
            link
            name
          },
          categories {
            id
            name
          }
        }`,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setData(res.data.bookmarks);
        setCategories(res.data.categories);
      });
  }, []);

  return (
    <main className={styles.bookmarks}>
      <div className={styles.header}>
        {categories.map((item) => (
          <button key={item.id} className={styles.button} onClick={() => setSelected(item.name)}>
            {item.name}
          </button>
        ))}
      </div>
      <div className={styles.content}>
        {data.map((item) => (
          <Link key={item.id} href={item.link} target="_blank" className={styles.item}>
            <span>{item.name}</span>
            <span>{item.desc}</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
const categories = ["Tools", "Applications", "Vs Code Extensions", "React Development", "Js Development"];
