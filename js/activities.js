const form = document.getElementById("activity-form");
const nameInput = document.getElementById("activity-name");
const timeInput = document.getElementById("activity-time");
const activityList = document.getElementById("activity-list");
const statusMessage = document.getElementById("activity-status");

function setStatus(message) {
    statusMessage.textContent = message;
}

async function requestApi(url, options) {
    const response = await fetch(url, options);
    const result = response.status === 204 ? null : await response.json();

    if (!response.ok) {
        throw new Error(result?.error ?? "APIリクエストに失敗しました。");
    }

    return result;
}

function renderActivities(activities) {
    activityList.replaceChildren();

    if (activities.length === 0) {
        const emptyItem = document.createElement("li");
        emptyItem.textContent = "活動はまだ登録されていません。";
        activityList.append(emptyItem);
        return;
    }

    for (const activity of activities) {
        const item = document.createElement("li");
        const details = document.createElement("span");
        const deleteButton = document.createElement("button");

        details.textContent = activity.time_seconds === null
            ? `${activity.name}（タイム未登録）`
            : `${activity.name}（${Number(activity.time_seconds)}秒）`;
        deleteButton.type = "button";
        deleteButton.textContent = "削除";
        deleteButton.setAttribute("aria-label", `${activity.name}を削除`);
        deleteButton.addEventListener("click", () => deleteActivity(activity.id, deleteButton));

        item.append(details, deleteButton);
        activityList.append(item);
    }
}

async function loadActivities() {
    const result = await requestApi("/api/activities");
    renderActivities(result.activities);
}

async function deleteActivity(id, button) {
    button.disabled = true;
    try {
        await requestApi(`/api/activities/${encodeURIComponent(id)}`, { method: "DELETE" });
        try {
            await loadActivities();
            setStatus("活動を削除しました。");
        } catch (error) {
            setStatus(`削除しましたが、一覧の更新に失敗しました: ${error.message}`);
        }
    } catch (error) {
        button.disabled = false;
        setStatus(`活動を削除できませんでした: ${error.message}`);
    }
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.disabled = true;

    try {
        await requestApi("/api/activities", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: nameInput.value,
                timeSeconds: Number(timeInput.value)
            })
        });
        form.reset();

        try {
            await loadActivities();
            setStatus("活動を登録しました。");
        } catch (error) {
            setStatus(`登録しましたが、一覧の更新に失敗しました: ${error.message}`);
        }
    } catch (error) {
        setStatus(`活動を登録できませんでした: ${error.message}`);
    } finally {
        submitButton.disabled = false;
    }
});

loadActivities().catch((error) => {
    setStatus(`活動を読み込めませんでした: ${error.message}`);
});
