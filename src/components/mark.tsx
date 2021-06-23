import React from "react";

export const Mark = ({ name, keyword }: { name: string; keyword: string }) => {
  if (!keyword) {
    return <p>{name}</p>;
  }
  const arr = name.split(keyword);
  return (
    <p>
      {arr.map((str, index) => (
        <span key={index}>
          {str}
          {index === arr.length - 1 ? null : (
            <b style={{ color: "#257afd" }}>{keyword}</b>
          )}
        </span>
      ))}
    </p>
  );
};
