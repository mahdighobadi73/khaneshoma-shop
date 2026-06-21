// About.jsx
import React from 'react';
import styles from "./About.module.css";

// Data-Driven Approach: محتوا را از لایه نمایش جدا کردیم
const ABOUT_FEATURES = [
  {
    id: 1,
    title: "چرا ما را انتخاب کنید؟",
    text: "بیش از ۱۵ سال تجربه در فروش لوازم خانگی باکیفیت داریم. مسئولیت اجتماعی، صداقت در فروش و رضایت مشتری برای ما core value است.",
  },
  {
    id: 2,
    title: "تیم ما",
    text: "تیم ما از افراد متخصص، خوش‌سلیقه و باتجربه تشکیل شده که همیشه برای ارائه بهترین خدمات تلاش می‌کنند و در انتخاب محصول همراه شما هستند.",
  },
  {
    id: 3,
    title: "ارزش‌های ما",
    text: "اصول اخلاقی و حرفه‌ای ما:",
    list: ["کیفیت و اعتماد", "قیمت عادلانه و رقابتی", "سرویس‌دهی بهتر", "نوآوری و توسعه"],
  },
];

// Sub-component برای رعایت اصل DRY (Don't Repeat Yourself)
const AboutCard = ({ title, text, list }) => (
  <article className={styles.contentCard}>
    <h3>{title}</h3>
    <p>{text}</p>
    {list && (
      <ul className={styles.checkList}>
        {list.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    )}
  </article>
);

export default function About() {
  return (
    <section className={styles.aboutSection}>
      <div className={`container`}>
        <header className={styles.sectionHead}>
          <span className={styles.eyebrow}>درباره ما</span>
          <h2>خانه شما، آرام و شیک</h2>
          <p>
            ما فروشگاه لوازم خانگی و دکوراسیون هستیم که با تمرکز بر کیفیت،
            تجربه مشتری و انتخاب حرفه‌ای محصول فعالیت می‌کنیم.
          </p>
        </header>

        <div className={styles.contentGrid}>
          {ABOUT_FEATURES.map((feature) => (
            <AboutCard key={feature.id} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
