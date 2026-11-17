"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useRef } from "react";
import { CheckCircle2 } from "lucide-react";
import { inquirySchema, type Inquiry } from "@/lib/inquiry";
import { products, type Locale } from "@/content/repository";
export default function InquiryForm({ locale }: { locale: Locale }) {
  const uk = locale === "uk";
  const params = useSearchParams();
  const [result, setResult] = useState<"demo" | "live" | "error" | null>(null);
  const lock = useRef(false);
  const status = useRef<HTMLDivElement>(null);
  const material = products.some((p) => p.slug === params.get("material"))
    ? params.get("material")!
    : "consultation";
  const kind = ["supply", "samples", "grower", "general"].includes(
    params.get("type") || "",
  )
    ? (params.get("type") as Inquiry["kind"])
    : "supply";
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inquiry>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      locale,
      kind,
      material,
      unit: "consultation",
      website: "",
      company: "",
      person: "",
      email: "",
      country: "",
      application: "",
    },
  });
  const submit = async (data: Inquiry) => {
    if (lock.current) return;
    lock.current = true;
    setResult(null);
    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = await response.json();
      if (!response.ok) throw Error("request failed");
      setResult(
        body.mode === "demo" ? "demo" : body.delivered ? "live" : "error",
      );
    } catch {
      setResult("error");
    } finally {
      lock.current = false;
      requestAnimationFrame(() => status.current?.focus());
    }
  };
  const field = (
    key:
      | "company"
      | "person"
      | "email"
      | "phone"
      | "country"
      | "volume"
      | "period",
    label: string,
    required = false,
    type = "text",
  ) => (
    <label className="form-field" key={key}>
      <span id={`${key}-label`}>
        {label}
        {required ? " *" : ""}
      </span>
      <input
        type={type}
        aria-labelledby={`${key}-label`}
        aria-required={required}
        autoComplete={
          key === "person"
            ? "name"
            : key === "company"
              ? "organization"
              : key === "email"
                ? "email"
                : key === "phone"
                  ? "tel"
                  : key === "country"
                    ? "country-name"
                    : "off"
        }
        {...register(key)}
        aria-invalid={!!errors[key]}
        aria-describedby={errors[key] ? `${key}-error` : undefined}
      />
      {errors[key] && (
        <small id={`${key}-error`} className="field-error">
          {uk ? "Перевірте це поле." : "Please check this field."}
        </small>
      )}
    </label>
  );
  return (
    <form
      className="inquiry-form"
      onSubmit={(event) => {
        void handleSubmit(submit)(event);
      }}
      noValidate
    >
      <div className="form-note">
        <span className="status-dot" />
        {uk
          ? "Демонстраційний сайт. Режим обробки буде вказано в результаті перевірки заявки."
          : "Demonstration website. The processing mode is stated in the request result."}
      </div>
      <div className="form-grid">
        <label className="form-field">
          <span>{uk ? "Тип звернення" : "Inquiry type"} *</span>
          <select defaultValue={kind} {...register("kind")}>
            {[
              ["supply", uk ? "Постачання" : "Supply"],
              ["samples", uk ? "Зразки" : "Samples"],
              ["grower", uk ? "Агропартнерство" : "Grower partnership"],
              ["general", uk ? "Загальне питання" : "General inquiry"],
            ].map(([v, t]) => (
              <option value={v} key={v}>
                {t}
              </option>
            ))}
          </select>
        </label>
        <label className="form-field">
          <span>{uk ? "Матеріал" : "Material"} *</span>
          <select defaultValue={material} {...register("material")}>
            <option value="consultation">
              {uk ? "Потрібна консультація" : "I need a consultation"}
            </option>
            {products.map((p) => (
              <option value={p.slug} key={p.slug}>
                {p.name[locale]}
              </option>
            ))}
          </select>
        </label>
        {field("company", uk ? "Компанія" : "Company", true)}
        {field("person", uk ? "Контактна особа" : "Contact person", true)}
        {field("email", uk ? "Робочий email" : "Work email", true, "email")}
        {field(
          "phone",
          uk ? "Телефон (необов’язково)" : "Phone (optional)",
          false,
          "tel",
        )}
        {field("country", uk ? "Країна" : "Country", true)}
        {field(
          "period",
          uk ? "Бажаний період постачання" : "Desired delivery period",
        )}
        {field(
          "volume",
          uk
            ? "Орієнтовний обсяг (необов’язково)"
            : "Approximate volume (optional)",
        )}
        <label className="form-field">
          <span>{uk ? "Одиниця вимірювання" : "Unit"}</span>
          <select defaultValue="consultation" {...register("unit")}>
            <option value="consultation">
              {uk ? "Потрібна консультація" : "Consultation needed"}
            </option>
            <option value="tonnes">{uk ? "Тонни" : "Tonnes"}</option>
            <option value="kg">{uk ? "Кілограми" : "Kilograms"}</option>
          </select>
        </label>
        <label className="form-field full">
          <span>
            {uk ? "Передбачене застосування" : "Intended application"} *
          </span>
          <textarea
            rows={3}
            {...register("application")}
            aria-invalid={!!errors.application}
            aria-describedby={
              errors.application ? "application-error" : undefined
            }
            placeholder={
              uk
                ? "Що плануєте виготовляти? Які характеристики важливі?"
                : "What will you manufacture? Which characteristics matter?"
            }
          />
          {errors.application && (
            <small className="field-error" id="application-error">
              {uk
                ? "Опишіть застосування, щонайменше 3 символи."
                : "Describe your application in at least 3 characters."}
            </small>
          )}
        </label>
        <label className="form-field full">
          <span>{uk ? "Коментар" : "Comment"}</span>
          <textarea rows={3} {...register("comment")} />
          {errors.comment && (
            <small className="field-error">
              {uk ? "Максимум 4000 символів." : "Maximum 4,000 characters."}
            </small>
          )}
        </label>
      </div>
      <div className="honeypot" aria-hidden="true">
        <label>
          Website
          <input {...register("website")} tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <label className="consent">
        <input
          type="checkbox"
          {...register("consent")}
          aria-invalid={!!errors.consent}
        />
        <span>
          {uk ? "Я ознайомився/лась з" : "I have read the"}{" "}
          <Link href={`/${locale}/privacy`}>
            {uk
              ? "інформацією про обробку даних"
              : "data processing information"}
          </Link>
          . *
        </span>
      </label>
      {errors.consent && (
        <p className="field-error">
          {uk
            ? "Підтвердьте ознайомлення з інформацією про обробку даних."
            : "Please confirm you have read the data processing information."}
        </p>
      )}
      <button type="submit" className="button" disabled={isSubmitting}>
        {isSubmitting
          ? uk
            ? "Перевіряємо…"
            : "Checking…"
          : uk
            ? "Надіслати запит"
            : "Submit inquiry"}
      </button>
      <div
        ref={status}
        tabIndex={-1}
        role="status"
        aria-live="polite"
        className={`form-result ${result || ""}`}
      >
        {result && (
          <>
            <CheckCircle2 size={20} />
            <p>
              {result === "demo"
                ? uk
                  ? "Demo: заявку перевірено. Її не надіслано, менеджер її не отримав. Дані залишено у формі."
                  : "Demo: your inquiry was validated. It was not sent or received by a manager. Your entries remain in the form."
                : result === "live"
                  ? uk
                    ? "Сервіс доставки підтвердив прийняття заявки."
                    : "The delivery service confirmed acceptance of your inquiry."
                  : uk
                    ? "Заявку не доставлено. Дані збережено у формі. Спробуйте пізніше; після кількох спроб зачекайте 10 хвилин."
                    : "Your inquiry was not delivered. Your entries remain in the form. Try later; after several attempts, wait 10 minutes."}
            </p>
          </>
        )}
      </div>
    </form>
  );
}
