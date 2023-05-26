// Librarys
import { memo } from "react";

// Utils
import classnames from "../../../../utils/classnames";

// Constants
import { fields } from "./constants";

function Fields() {
  return (
    <div className="appointments-fields pt-3">
      <ul className="appointments-list list-unstyled d-flex mb-0 px-3">
        {fields.map((field) => (
          <li
            key={field.id}
            className={classnames([field.className, "py-2 appointment-field"])}
          >
            {field.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default memo(Fields);
