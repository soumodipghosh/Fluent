const FALLBACK = "https://i.pravatar.cc/150?img=3"

const Avatar = ({ src, className }) => (
  <img
    src={src || FALLBACK}
    className={className}
    onError={e => (e.currentTarget.src = FALLBACK)}
  />
)

export default Avatar
