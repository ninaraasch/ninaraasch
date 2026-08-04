import { Button, Stack, Text } from "@sanity/ui";
import { useRef, useState } from "react";
import { insert, setIfMissing, useClient, type ArrayOfObjectsInputProps } from "sanity";
import { apiVersion } from "../../lib/sanity/config";

const BATCH_SIZE = 5;

function imageKey() {
  return Math.random().toString(36).slice(2, 12);
}

export function MultiImageInput(props: ArrayOfObjectsInputProps) {
  const { onChange } = props;
  const client = useClient({ apiVersion });
  const fileInput = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState<{ done: number; total: number } | null>(
    null,
  );

  const uploadFiles = async (fileList: FileList) => {
    const files = Array.from(fileList);
    if (files.length === 0) return;

    setProgress({ done: 0, total: files.length });
    onChange(setIfMissing([]));

    for (let start = 0; start < files.length; start += BATCH_SIZE) {
      const batch = files.slice(start, start + BATCH_SIZE);
      const assets = await Promise.all(
        batch.map((file) =>
          client.assets.upload("image", file, { filename: file.name }),
        ),
      );

      onChange(
        insert(
          assets.map((asset) => ({
            _type: "image",
            _key: imageKey(),
            asset: { _type: "reference", _ref: asset._id },
          })),
          "after",
          [-1],
        ),
      );

      setProgress({ done: Math.min(start + BATCH_SIZE, files.length), total: files.length });
    }

    setProgress(null);
    if (fileInput.current) fileInput.current.value = "";
  };

  return (
    <Stack space={3}>
      {props.renderDefault(props)}

      <Stack space={2}>
        <Button
          mode="ghost"
          text={
            progress
              ? `Uploading ${progress.done} / ${progress.total}…`
              : "Upload multiple images"
          }
          disabled={progress !== null}
          onClick={() => fileInput.current?.click()}
        />
        {progress ? (
          <Text size={1} muted>
            Keep this window open until the upload finishes.
          </Text>
        ) : null}
      </Stack>

      <input
        ref={fileInput}
        type="file"
        multiple
        accept="image/*"
        style={{ display: "none" }}
        onChange={(event) => {
          if (event.target.files) void uploadFiles(event.target.files);
        }}
      />
    </Stack>
  );
}
