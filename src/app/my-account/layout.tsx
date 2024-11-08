interface MyAccountLayoutProps {
  children: React.ReactNode
  ordersinfo: React.ReactNode
  userinfo: React.ReactNode
}

export default async function MyAccountLayout(props: MyAccountLayoutProps) {
  return (
    <div>
      {props.children}
      {props.userinfo}
      {props.ordersinfo}
    </div>
  )
}
