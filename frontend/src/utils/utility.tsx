import { Star, StarFill, StarHalf } from 'react-bootstrap-icons'

type func = (e: React.MouseEvent<HTMLOrSVGElement>) => void

export const windowWidth = window.innerWidth
// eslint-disable-next-line @typescript-eslint/no-empty-function
export const displayStars = (num: number, func?: func) => {
  const starCount = num.toString().split('.')
  const stars = []

  for (let i = 0; i < +starCount[0]; i++)
    stars.push(<StarFill key={i} id={`${i + 1}`} onClick={func} />)

  starCount[1] && stars.push(<StarHalf key={Math.random()} />)

  while (stars.length !== 5) {
    stars.push(
      <Star onClick={func} id={`${stars.length + 1}`} key={Math.random()} />
    )
  }

  return stars
}
