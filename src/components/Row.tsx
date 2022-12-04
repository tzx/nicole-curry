import "./components.css"

const Row = (props: any) => {
  return (
    <div className="row">
      {props.children}
    </div>
  )
}
export default Row
