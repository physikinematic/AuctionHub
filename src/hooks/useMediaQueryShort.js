import { useMediaQuery } from "@mui/material"

export const useMediaQueryShort = () => {
  const xs = useMediaQuery("only screen and (max-width : 599px)");
  const sm = useMediaQuery("only screen and (max-width : 600px) and (max-width : 901px)");
  const is_smUp = useMediaQuery("only screen and (max-width : 600px)");
  const is_mdDown = useMediaQuery("only screen and (min-width : 601px) and (max-width : 901px)");
  const md = useMediaQuery("only screen and (min-width : 601px) and (max-width : 899px)");
  const is_mdUp = useMediaQuery("only screen and (min-width : 601px) and (max-width : 901px)");
  const is_lgDown = useMediaQuery("only screen and (max-width : 901px)");
  const is_lg = useMediaQuery("only screen and (min-width : 902px)");
  
  return {xs: xs, sm: sm, md: md};
}