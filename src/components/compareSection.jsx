import { useAtom } from 'jotai'
import { compareState } from '../atoms/useIndexState'
import styled from 'styled-components'
import CompareProduct from './compare/compareProduct'

function CompareSection() {
  const [compareList] = useAtom(compareState)

  return (
    <CompareBox className="flex-center column">
      <CompareTitle className="flex-center column">
        <h1>The Comparison</h1>
        <em>고민하지 말고, 비교하세요.</em>
      </CompareTitle>
      <CompareProduct />
    </CompareBox>
  )
}

export default CompareSection

const CompareBox = styled.section`
  width: 100%;
`

const CompareTitle = styled.div`
  padding: 100px;
  gap: 20px;
  text-align: center;
  h1 {
    font-size: clamp(20px, 6vw, 40px);
    font-family: '42dot Sans';
    font-weight: bold;
    letter-spacing: -1px;
    text-transform: uppercase;
    /* opacity: 0.1; */
  }

  em {
    font-size: clamp(13px, 5vw, 20px);
  }

  @media (max-width: 860px) {
    padding: 50px;
  }
`
