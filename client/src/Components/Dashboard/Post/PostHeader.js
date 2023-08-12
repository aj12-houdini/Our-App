import { formatDate } from "../../../js/formatDate";

import PostAccordion from "../../Common/accordion";

export default function PostHeader({ userFlag, title, descr, date,id, user }) {
  date = formatDate(new Date(date));
  return (
    <PostAccordion user = {user} userFlag = {userFlag} id={id} date = {date} title={title} descr = {descr} />
  );
}
