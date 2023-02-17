import Alert from 'react-bootstrap/Alert'

const Message = (props) => (
  <Alert variant={props.variant} dismissible>
    <Alert.Heading>{props.heading}</Alert.Heading>
    <p>
      {console.log(props.children)}
      {props.children}
    </p>
  </Alert>
)

Message.defaultProps = {
  variant: 'info',
}

export default Message