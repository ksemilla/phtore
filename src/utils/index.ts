import { ApolloError } from "@apollo/client"
import React, { useEffect, useState } from "react"

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}


export const logError = (
  error: Record<string, any> | ApolloError | undefined
) => {
  if (error?.message) {
    console.log("[ERROR]", error.message)
  } else {
    console.log("[ERROR]", error)
  }
}

type UnknownArrayOrObject = Record<string, any>

export const dirtyValues = (
  dirtyFields: UnknownArrayOrObject | boolean,
  allValues: UnknownArrayOrObject
): UnknownArrayOrObject => {
  // NOTE: Recursive function.

  // If *any* item in an array was modified, the entire array must be submitted, because there's no
  // way to indicate "placeholders" for unchanged elements. `dirtyFields` is `true` for leaves.
  if (dirtyFields === true || Array.isArray(dirtyFields)) {
    return allValues
  }

  // Here, we have an object.

  if (typeof dirtyFields !== "boolean" && typeof allValues !== "boolean") {
    return Object.fromEntries(
      Object.keys(dirtyFields).map((key) => [
        key,
        dirtyValues(dirtyFields[key], allValues[key]),
      ])
    )
  }

  return {}
}

export const useSearchDebounce = (
  delay: number = 350
): [string, string, React.Dispatch<React.SetStateAction<string>>] => {
  const [delayedSearch, setDelayedSearch] = useState<string>("")
  const [searchQuery, setSearchQuery] = useState<string>("")

  useEffect(() => {
    const delayFn = setTimeout(() => setDelayedSearch(searchQuery), delay)
    return () => clearTimeout(delayFn)
  }, [searchQuery, delay])

  return [delayedSearch, searchQuery, setSearchQuery]
}

export const fieldChecker = (o: Record<string, any>, s: string): boolean => {
  s = s.replace(/\[(\w+)\]/g, ".$1") // convert indexes to properties
  s = s.replace(/^\./, "") // strip a leading dot
  let a = s.split(".")
  for (let i = 0, n = a.length; i < n; ++i) {
    let k = a[i]
    if (k in o) {
      o = o[k]
    } else {
      return false
      // return
    }
  }
  return true
  // return o;
}

export const getValueFromErrors = (
  o: Record<string, any>,
  s: string
): Record<string, any> | undefined => {
  s = s.replace(/\[(\w+)\]/g, ".$1") // convert indexes to properties
  s = s.replace(/^\./, "") // strip a leading dot
  let a = s.split(".")
  for (let i = 0, n = a.length; i < n; ++i) {
    let k = a[i]
    if (k in o) {
      o = o[k]
    } else {
      return
    }
  }
  return o
}

export const enumToObject = (e: { [key: string]: any }) => {
  const length = Object.values(e).length / 2
  return Object.fromEntries(Object.entries(e).slice(length))
}
