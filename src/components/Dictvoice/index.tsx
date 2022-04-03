import { playWordVoice } from '@/tools';
import { SoundOutlined } from '@ant-design/icons'

interface DictvoiceProps {
  word: string
}

export const Dictvoice = (props: DictvoiceProps) => {
  const { word } = props

  const handlePlayVoice = () => {
    playWordVoice(word)
  }

  return <SoundOutlined onClick={handlePlayVoice} />
};

export default Dictvoice;
