import React, { useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";
import classes from "@/components/sentences/Sentences.module.css";

import axios from "axios";

const Sentences = () => {
  const [sentences, setSentences] = useState([]);
  const [loading, setLoading] = useState(false);

  const formattedDate = new Intl.DateTimeFormat("he-IL", {
    dateStyle: "short",
  });

  useEffect(() => {
    getSentences();
  }, []);

  async function getSentences() {
    try {
      setLoading(true);
      const response = await axios.get("/api/get-sentences");
      setSentences(response);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="sentences" className={classes.section}>
      <div className={classes.sentences_container}>
        <h1>משפטים אישיים</h1>
        <div className={classes.sentences_content}>
          {loading ? <div className={classes.loader}></div> :
            <ul
              className={classes.sentences_lists}
            >
              {sentences.data?.map(
                (sentence, i) =>
                  sentence.isActive && (
                    <React.Fragment key={sentence._id}>
                      <li
                        data-tooltip-id={`sentences_tooltip_${i}`}
                        data-tooltip-place="bottom"
                      >
                        {sentence.sentence}
                      </li>
                      <Tooltip id={`sentences_tooltip_${i}`}>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                          <span>
                            תאריך הוספה: {formattedDate.format(sentence.date)}
                          </span>
                          <span>שם: {sentence.fullName}</span>
                          <span>קרבה: {sentence.familyCloseness}</span>
                        </div>
                      </Tooltip>
                    </React.Fragment>
                  )
              )}
            </ul>
          }
        </div>
      </div>
    </section>
  );
};

export default Sentences;
