interface ProgressBarProps {
  checked: number;
  total: number;
  label?: string;
}

export function ProgressBar({
  checked,
  total,
  label = "Progreso",
}: ProgressBarProps) {
  const percentage = Math.round((checked / total) * 100);

  return (
    <div>
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="progress-text">
        {label}: {checked}/{total} ({percentage}%)
      </div>
    </div>
  );
}
