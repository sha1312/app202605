const recentName = document.getElementById("home-recent-name");
const recentTime = document.getElementById("home-recent-val");

async function loadLatestActivity() {
    const response = await fetch("/api/activities/latest");
    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.error ?? "最新の活動を読み込めませんでした。");
    }

    if (!result.activity) {
        recentName.textContent = "活動なし";
        recentTime.textContent = "活動を登録してください";
        return;
    }

    recentName.textContent = result.activity.name;
    recentTime.textContent = result.activity.time_seconds === null
        ? "タイム未登録"
        : `${Number(result.activity.time_seconds)}秒`;
}

loadLatestActivity().catch((error) => {
    console.error("最新活動の取得に失敗しました:", error);
    recentName.textContent = "読み込み失敗";
    recentTime.textContent = "活動ページで確認してください";
});
