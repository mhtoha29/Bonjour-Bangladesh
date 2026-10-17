import styles from "./media-placeholder.module.css";

type MediaPlaceholderProps = {
  label?: string;
  shape?: "portrait" | "landscape" | "square";
  tone?: "sage" | "stone" | "linen";
  className?: string;
  displayText?: string;
};

export function MediaPlaceholder({ label = "Photography to follow", shape = "portrait", tone = "sage", className = "", displayText }: MediaPlaceholderProps) {
  return (
    <div className={`${styles.placeholder} ${styles[shape]} ${styles[tone]} ${className}`} aria-label={label} role="img">
      {displayText && <span className={styles.displayText} aria-hidden="true">{displayText}</span>}
      <span className={styles.label} aria-hidden="true">Photography to follow</span>
    </div>
  );
}
