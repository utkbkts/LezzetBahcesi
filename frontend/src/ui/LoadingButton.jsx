import PropTypes from "prop-types";
import { Button } from "antd";
import { Loader2 } from "lucide-react";
import { cn } from "../lib/utils";
const LoadingButton = ({ className, loading, disabled, ...props }) => {
  return (
    <Button
      disabled={loading || disabled}
      className={cn("flex items-center gap-2", className)}
      {...props}
    >
      {loading && <Loader2 className="size-5 animate-spin" />}
      {props.children}
    </Button>
  );
};

LoadingButton.propTypes = {
  className: PropTypes.string,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  children: PropTypes.node,
};

export default LoadingButton;
