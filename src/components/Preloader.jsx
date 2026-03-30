export default function Preloader({ className }) {
  return (
    <div className={`preloader ${className || ''}`}>
      <div className="preloader-logo">&lt;Zareth /&gt;</div>
    </div>
  )
}
