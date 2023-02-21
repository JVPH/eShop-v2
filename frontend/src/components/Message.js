import Alert from 'react-bootstrap/Alert'

const Message = (props) => (
  <Alert variant={props.variant} >
    {/* <Alert.Heading>{props.heading}</Alert.Heading> */}
    {props.children}
  </Alert>
)

Message.defaultProps = {
  variant: 'info',
}

export default Message