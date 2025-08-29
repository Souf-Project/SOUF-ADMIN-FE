export default function MainRecruitBlock({
  title,
  host,
  prize,
  target,
  content,
  imageUrl,
}) {
    
  return (
    <div className="border border-black p-4 w-full bg-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
      <section className="flex gap-4">
        <div className="w-1/3 h-60 bg-gray-200 flex items-center justify-center overflow-hidden">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-gray-500">이미지 없음</span>
          )}
        </div>

        <div className="flex flex-col gap-2 w-2/3 text-md">
          <p>
            <span className="font-semibold">주최 :</span> {host}
          </p>
          <p>
            <span className="font-semibold">시상 규모 :</span> {prize}
          </p>
          <p>
            <span className="font-semibold">참여 대상 :</span> {target}
          </p>
          <p className="line-clamp-4">
            <span className="font-semibold">내용 :</span>{" "}
            {content?.length > 100 ? content.slice(0, 100) + "..." : content}
          </p>
        </div>
      </section>
    </div>
  );
}
