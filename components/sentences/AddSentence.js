"use client";

import { useState } from "react";
import { TextField } from "@mui/material";
import { LoadingButton } from '@mui/lab';
import { useRouter } from "next/router"; // Corrected import
import { useForm } from "react-hook-form";
import axios from "axios";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import classes from "@/components/sentences/AddSentence.module.css";

const AddSentence = () => {
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => addNewSentence(data);
  const router = useRouter();

  const successNotify = () =>
    toast.success("מעולה! המשפט יעלה בקרוב, הינך מועבר לדף הבית", {
      position: "top-center",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });

  const errorNotify = () =>
    toast.error("חלה שגיאה בשליחה", {
      position: "top-center",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });

  async function addNewSentence(data) {
    setLoading(true);

    try {
      const response = await axios.post("/api/new-sentence", {
        date: new Date().getTime(),
        isActive: false,
        ...data,
      });
      setLoading(false);

      successNotify();
      setTimeout(() => {
        router.push("/");
      }, 3000);
    } catch (err) {
      errorNotify();
      setLoading(false);
      console.error(err);
    }
  }

  return (
    <div className={classes.wrapper}>
      <div className="nav-title mobile">
        <span className="nav-title-primary">
          רבקה דוד ז״ל
          <span className="nav-title-secondary">09.11.1940 - 19.04.2023</span>
        </span>
      </div>
      <div className={classes.title_container}>
        <h1>הוספת משפט אישי</h1>
      </div>
      <div className={classes.form_wrapper}>
        <form
          className={classes.form_container}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={classes.sentence_field}>
            <TextField
              id="standard-basic"
              label="שם מלא"
              variant="standard"
              {...register("fullName", {
                required: "נא להזין שם מלא",
                pattern: {
                  value: /^[\u0590-\u05fe\s]+$/i,
                  message: "יש להזין שם מלא בשפה העברית בלבד",
                },
                maxLength: { value: 15, message: "עד 15 תווים בלבד" },
              })}
            ></TextField>
            <span>
              {typeof errors.fullName?.message === "string"
                ? errors.fullName?.message
                : JSON.stringify(errors.fullName?.message)}
            </span>
          </div>

          <div className={classes.sentence_field}>
            <TextField
              id="standard-basic"
              label="קרבה משפחתית"
              variant="standard"
              {...register("familyCloseness", {
                required: "נא להזין קרבה משפחתית",
                pattern: {
                  value: /^[\u0590-\u05fe\s]+$/i,
                  message: "יש להזין קרבה משפחתית בשפה העברית בלבד",
                },
                maxLength: { value: 15, message: "עד 15 תווים בלבד" },
              })}
            ></TextField>
            <span>
              {typeof errors.familyCloseness?.message === "string"
                ? errors.familyCloseness?.message
                : JSON.stringify(errors.familyCloseness?.message)}
            </span>
          </div>

          <div className={classes.sentence_field}>
            <TextField
              id="standard-basic"
              label="משפט"
              variant="standard"
              {...register("sentence", {
                required: "נא להזין משפט",
                pattern: {
                  value: /[\u0590-\u05FF\s!?,:\)\(\p{So}]/u, // Added 'u' flag
                  message: "יש להזין משפט תקין בעברית",
                },
                maxLength: { value: 50, message: "עד 50 תווים בלבד" },
              })}
            ></TextField>
            <span>
              {typeof errors.sentence?.message === "string"
                ? errors.sentence?.message
                : JSON.stringify(errors.sentence?.message)}
            </span>
          </div>

          <LoadingButton
            onClick={handleSubmit(onSubmit)}
            loading={loading}
            loadingIndicator="שולח..."
            variant="outlined"
            type="submit"
            size="large"
          >
            <span>לחץ להוספה</span>
          </LoadingButton>
        </form>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default AddSentence;
