

export function getStringFromForm(
  formData: FormData,
  key: string,
  defaultValue = ""
): string {
    const val = formData.get(key)
    if (val == null) return defaultValue
    if (typeof val === "string") return val;

    return defaultValue
}

export function getNumberFromForm(
  formData: FormData,
  key: string,
  defaultValue = 0
) : number {
    const str = getStringFromForm(formData, key, "").trim();
    if (str === "") return defaultValue
    const n = Number(str)
    return Number.isFinite(n) ? n : defaultValue
}