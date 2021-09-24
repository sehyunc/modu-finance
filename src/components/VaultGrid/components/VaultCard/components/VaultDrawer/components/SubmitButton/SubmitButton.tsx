import { Button, Text } from '@chakra-ui/react'

interface SubmitButtonProps {
  handleClick: () => void
  text: string
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ handleClick, text }) => (
  <Button onClick={handleClick} size="lg" width="100%">
    <Text>{text}</Text>
  </Button>
)

export default SubmitButton
