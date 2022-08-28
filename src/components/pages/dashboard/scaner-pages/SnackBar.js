import { forwardRef, useImperativeHandle, useRef } from 'react'

const Child = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    childFunction1(data) {
      console.log('child function 1 called')
    },
    childFunction2() {
      console.log('child function 2 called')
    }
  }))

  return (
    <div>
      <h2>child content</h2>
    </div>
  )
})

export default function Parent() {
  const childRef = useRef(null)

  const handleClick = () => {
    const data = { name: 123, last: 456 }
    childRef.current.childFunction1(data)

    childRef.current.childFunction2()
  }

  return (
    <div>
      <Child ref={childRef} />

      <h2>parent content</h2>

      <button onClick={() => handleClick()}>Call child functions</button>
    </div>
  )
}
