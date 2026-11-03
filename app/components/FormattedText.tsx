import { Fragment } from "react";
/** The existing CV uses **emphasis** alongside its trusted, local HTML links. */
export default function FormattedText({ text }: {
    text: string;
}) {
    return <>{text.split(/(\*\*.*?\*\*)/g).map((part, index) => (<Fragment key={index}>
      {part.startsWith("**") && part.endsWith("**")
                ? <strong dangerouslySetInnerHTML={{ __html: part.slice(2, -2) }}/>
                : <span dangerouslySetInnerHTML={{ __html: part }}/>}
    </Fragment>))}</>;
}
