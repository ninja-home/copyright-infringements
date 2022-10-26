export default function SimpleForm(props) {
    return (
        <form className="w-full max-w-2xl" action={props.action} method={props.method}>
            {props.children}
        </form>
    )
}
