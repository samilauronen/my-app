
export function getChangedProps(prevProps, currProps) {
    let diff = Object.keys(prevProps).reduce((diff, key) => {
        if (prevProps[key] === currProps[key]) return diff
        return {
          ...diff,
          [key]: currProps[key]
        }
      }, {})
    return diff;
}