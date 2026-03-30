export default function Preloader({ className }) {
  return (
    <div className={`preloader ${className || ''}`}>
      <div className="preloader-content">
        <div className="preloader-logo">&lt;Zareth /&gt;</div>
        <div className="preloader-progress-container">
          <div className="preloader-progress-bar" />
        </div>
      </div>
    </div>
  )
}
