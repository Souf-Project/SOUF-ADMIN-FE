export default function Button({
    title,
    type="button",
    btnText,
    onClick,
    placeholder,
    onChange,
    disapproveText = '',
    essentialText = '',
    approveText = '',
    onValidChange = () => {},
    isValidateTrigger = false,
    isConfirmed = undefined,
    width= "w-full",
}) {
    return (
<button
    type={type}
  onClick={onClick}
  className={`btn-hover h-[52px] px-6 whitespace-nowrap rounded-[10px] text-black text-xl font-semibold bg-yellow-main flex items-center justify-center ${width}`}>
  {btnText}
</button>

    );
}