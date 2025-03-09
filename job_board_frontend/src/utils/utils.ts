export const formatSalary = (salary: string) => {
    if (!salary) return "Not specified";
    return `${Number(salary).toLocaleString()} / Yearly`;
  };

  export const formatDate = (dateString: string): string => {
    if (!dateString) return "Unknown";

    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;

    return new Intl.DateTimeFormat("en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };