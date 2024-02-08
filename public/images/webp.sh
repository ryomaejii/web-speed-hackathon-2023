#!/bin/sh

# カレントディレクトリ以下の全てのjpegファイルを検索し、それぞれをwebpに変換後、元のファイルを削除
find . -type f \( -iname "*.jpg" -or -iname "*.jpeg" \) -exec sh -c '
  for image; do
    # 出力ファイル名の拡張子を.webpに変更
    output="${image%.*}.webp"
    # WebPに変換
    if cwebp "$image" -o "$output" >/dev/null 2>&1; then
      # 変換が成功したら元のファイルを削除
      rm "$image"
    fi
  done
' sh {} +