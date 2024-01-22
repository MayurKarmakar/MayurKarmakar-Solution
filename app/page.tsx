import UserFormAndDataTableContainer from "@/_component/UserFormAndDataTableContainer";
import classes from "./page.module.css";

export default function Home() {
  return (
    <main className={classes.main}>
      <UserFormAndDataTableContainer />
    </main>
  );
}
