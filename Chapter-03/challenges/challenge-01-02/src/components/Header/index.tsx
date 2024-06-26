import Link from "next/link"
import styles from "./header.module.scss"
import commonStyles from "../../styles/common.module.scss"

export default function Header() {
  return (
    <div className={commonStyles.container}>
      <Link href="/">
        <img src="/images/logo.svg" alt="logo" />
      </Link>
    </div>
  )
}
