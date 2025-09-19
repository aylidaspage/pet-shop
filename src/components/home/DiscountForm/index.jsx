import { useState } from "react";
import style from "./style.module.css";

const initialForm = { name: "", phone: "", email: "" };

export default function DiscountForm() {
  const [form, setForm] = useState(initialForm);
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const errors = validate(form);
  const canSubmit = !Object.keys(errors).length && !submitted;

  function validate(v) {
    const e = {};
    if (!v.name.trim()) e.name = "Name is required";
    const digits = v.phone.replace(/\D/g, "");
    if (!v.phone.trim()) e.phone = "Phone is required";
    else if (digits.length < 7) e.phone = "Phone is invalid";

    if (!v.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = "Email is invalid";

    return e;
  }

  function onChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function onBlur(e) {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  }

  async function onSubmit(e) {
    e.preventDefault();

    if (!canSubmit) {
      setTouched({ name: true, phone: true, email: true });
      return;
    }

    try {
      
      console.log("POST /sale/send payload:", form); 
      setSubmitted(true);
      setForm(initialForm); 
      setTouched({});      
    } catch (err) {
      console.error("Failed to send form:", err);
    }
  }

  return (
    <section className={style.wrap}>
      <div className={style.card}>
        <h3 className={style.title}>5% off on the first order</h3>

        <div className={style.content}>
          <img className={style.img} src="/discount_form.png" alt="Pets" />

          <form className={style.form} noValidate onSubmit={onSubmit}>
            <input
              className={`${style.input} ${
                touched.name && errors.name ? style.inputError : ""
              }`}
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={onChange}
              onBlur={onBlur}
              disabled={submitted}
            />

            <input
              className={`${style.input} ${
                touched.phone && errors.phone ? style.inputError : ""
              }`}
              type="tel"
              name="phone"
              placeholder="Phone number"
              value={form.phone}
              onChange={onChange}
              onBlur={onBlur}
              disabled={submitted}
            />

            <input
              className={`${style.input} ${
                touched.email && errors.email ? style.inputError : ""
              }`}
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={onChange}
              onBlur={onBlur}
              disabled={submitted}
            />

            <button
              type="submit"
              className={style.btn}
              disabled={!canSubmit}
              aria-live="polite"
            >
              {submitted ? "Request Submitted" : "Get a discount"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
