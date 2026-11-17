"use client";

import { useState, useEffect } from "react";
import { 
  Link2, 
  Globe, 
  Activity, 
  Users, 
  Smartphone, 
  Laptop, 
  Copy, 
  Check, 
  ExternalLink, 
  Plus, 
  Search, 
  ArrowUpRight, 
  MapPin, 
  RefreshCw,
  Clock,
  Radio
} from "lucide-react";
import Link from "next/link";
import type { CustomLink, ClickEvent } from "@/lib/link-tracker";

interface AnalyticsDataResponse {
  summary: {
    totalLinks: number;
    totalClicks: number;
    uniqueVisitors: number;
  };
  links: CustomLink[];
  recentClicks: ClickEvent[];
  topCountries: { country: string; count: number; flag: string; percentage: number }[];
  topReferrers: { referer: string; count: number; percentage: number }[];
  topDevices: Record<string, number>;
}

export default function AnalyticsClient({ initialData }: { initialData: AnalyticsDataResponse }) {
  const [data, setData] = useState<AnalyticsDataResponse>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  // New Link Form State
  const [isCreating, setIsCreating] = useState(false);
  const [newSlug, setNewSlug] = useState("");
  const [newTargetUrl, setNewTargetUrl] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  const refreshData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/analytics");
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (slug: string) => {
    const fullUrl = `https://alim.dest.page/${slug}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(null), 2000);
  };

  const handleCreateLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setFormSuccess("");

    if (!newSlug.trim() || !newTargetUrl.trim()) {
      setFormError("Заполните слаг и целевой URL");
      return;
    }

    try {
      const res = await fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "create_link",
          slug: newSlug.trim().toLowerCase(),
          targetUrl: newTargetUrl.trim(),
          title: newTitle.trim() || newSlug.trim(),
        }),
      });

      const json = await res.json();
      if (!res.ok) {
        setFormError(json.error || "Не удалось создать ссылку");
      } else {
        setFormSuccess(`Ссылка /${json.link.slug} успешно создана!`);
        setNewSlug("");
        setNewTargetUrl("");
        setNewTitle("");
        setIsCreating(false);
        refreshData();
      }
    } catch (err: any) {
      setFormError(err.message || "Ошибка запроса");
    }
  };

  const filteredLinks = data.links.filter(
    (l) =>
      l.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.targetUrl.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-10 w-full">
      {/* 1. Header Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Clicks */}
        <div className="p-5 rounded-2xl bg-neutral-900/60 border border-white/10 flex flex-col gap-2">
          <div className="flex items-center justify-between text-muted-foreground text-xs font-mono uppercase tracking-wider">
            <span>Всего кликов</span>
            <Activity className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-bold tracking-tight text-white font-mono">
            {data.summary.totalClicks}
          </div>
          <p className="text-xs text-white/50">По всем активным кастомным ссылкам</p>
        </div>

        {/* Unique Visitors */}
        <div className="p-5 rounded-2xl bg-neutral-900/60 border border-white/10 flex flex-col gap-2">
          <div className="flex items-center justify-between text-muted-foreground text-xs font-mono uppercase tracking-wider">
            <span>Уникальные гости</span>
            <Users className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-3xl font-bold tracking-tight text-white font-mono">
            {data.summary.uniqueVisitors}
          </div>
          <p className="text-xs text-white/50">Уникальные IP и связки устройств</p>
        </div>

        {/* Active Custom Links */}
        <div className="p-5 rounded-2xl bg-neutral-900/60 border border-white/10 flex flex-col gap-2">
          <div className="flex items-center justify-between text-muted-foreground text-xs font-mono uppercase tracking-wider">
            <span>Активные ссылки</span>
            <Link2 className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-bold tracking-tight text-white font-mono">
            {data.summary.totalLinks}
          </div>
          <p className="text-xs text-white/50">Короткие URL без /r/ напрямую с корня</p>
        </div>

        {/* Top Geography */}
        <div className="p-5 rounded-2xl bg-neutral-900/60 border border-white/10 flex flex-col gap-2">
          <div className="flex items-center justify-between text-muted-foreground text-xs font-mono uppercase tracking-wider">
            <span>Главная локация</span>
            <Globe className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <span>{data.topCountries[0]?.flag || "🌐"}</span>
            <span className="truncate">{data.topCountries[0]?.country || "—"}</span>
          </div>
          <p className="text-xs text-white/50">
            {data.topCountries[0] ? `${data.topCountries[0].count} кликов (${data.topCountries[0].percentage}%)` : "Ожидание переходов"}
          </p>
        </div>
      </div>

      {/* 2. Management Toolbar: Search + Create Button + Refresh */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            placeholder="Поиск по слагам или целевым URL..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-neutral-900/80 border border-white/10 text-sm text-white placeholder-white/40 focus:outline-none focus:border-accent"
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={refreshData}
            disabled={isLoading}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
            title="Обновить аналитику"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
          </button>

          <button
            onClick={() => setIsCreating(!isCreating)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-black hover:bg-white/90 text-sm font-semibold transition-all cursor-pointer shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Новая ссылка</span>
          </button>
        </div>
      </div>

      {/* 3. New Link Form Drawer */}
      {isCreating && (
        <form
          onSubmit={handleCreateLink}
          className="p-6 rounded-2xl bg-neutral-900/90 border border-emerald-500/30 flex flex-col gap-4 shadow-xl"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Link2 className="w-4 h-4 text-emerald-400" />
              <span>Создать кастомную ссылку (без /r/)</span>
            </h3>
            <span className="text-xs font-mono text-emerald-400">alim.dest.page/[slug]</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-mono text-white/60">Слаг ссылки</label>
              <div className="flex items-center rounded-xl bg-black/50 border border-white/10 overflow-hidden px-3 py-2 text-sm">
                <span className="text-white/40 font-mono select-none">/</span>
                <input
                  type="text"
                  placeholder="google-pitch"
                  value={newSlug}
                  onChange={(e) => setNewSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-_]/g, ""))}
                  className="w-full bg-transparent text-white focus:outline-none font-mono"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-mono text-white/60">Целевой URL редиректа</label>
              <input
                type="text"
                placeholder="https://alimkhalelov.github.io/nebuly/"
                value={newTargetUrl}
                onChange={(e) => setNewTargetUrl(e.target.value)}
                className="rounded-xl bg-black/50 border border-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:border-accent"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-mono text-white/60">Название / Описание</label>
              <input
                type="text"
                placeholder="Nebuly Live Demo"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="rounded-xl bg-black/50 border border-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:border-accent"
              />
            </div>
          </div>

          {formError && <p className="text-xs text-rose-400">{formError}</p>}
          {formSuccess && <p className="text-xs text-emerald-400">{formSuccess}</p>}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsCreating(false)}
              className="px-4 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-white/70"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="px-5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold transition-all cursor-pointer shadow-md"
            >
              Сохранить ссылку
            </button>
          </div>
        </form>
      )}

      {/* 4. Active Links Registry Table */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <span>Кастомные ссылки</span>
            <span className="text-xs font-mono text-white/40">({filteredLinks.length})</span>
          </h2>
          <span className="text-xs text-muted-foreground font-mono">
            Кликните Copy для копирования alim.dest.page/[slug]
          </span>
        </div>

        <div className="rounded-2xl border border-white/10 overflow-hidden bg-neutral-900/40">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/5 text-xs font-mono uppercase tracking-wider text-muted-foreground border-b border-white/10">
                <tr>
                  <th className="py-3 px-4">Короткая ссылка</th>
                  <th className="py-3 px-4">Название & Цель</th>
                  <th className="py-3 px-4 text-center">Всего кликов</th>
                  <th className="py-3 px-4 text-center">Уникальных</th>
                  <th className="py-3 px-4">Последний переход</th>
                  <th className="py-3 px-4 text-right">Действия</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-mono">
                {filteredLinks.map((link) => (
                  <tr key={link.slug} className="hover:bg-white/[0.02] transition-colors">
                    {/* Short Link Badge */}
                    <td className="py-3 px-4">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/10 text-white font-bold text-xs hover:bg-white/15 transition-all">
                        <span className="text-accent font-normal">/</span>
                        <span>{link.slug}</span>
                      </div>
                    </td>

                    {/* Title & Target URL */}
                    <td className="py-3 px-4 font-sans max-w-xs sm:max-w-md">
                      <div className="font-semibold text-white truncate">{link.title}</div>
                      <a
                        href={link.targetUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-muted-foreground hover:text-accent flex items-center gap-1 truncate font-mono"
                      >
                        <span className="truncate">{link.targetUrl}</span>
                        <ArrowUpRight className="w-3 h-3 shrink-0" />
                      </a>
                    </td>

                    {/* Total Clicks */}
                    <td className="py-3 px-4 text-center">
                      <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold text-xs">
                        {link.totalClicks || 0}
                      </span>
                    </td>

                    {/* Unique Visitors */}
                    <td className="py-3 px-4 text-center">
                      <span className="px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 font-bold text-xs">
                        {link.uniqueVisitors || 0}
                      </span>
                    </td>

                    {/* Last Clicked */}
                    <td className="py-3 px-4 text-xs text-white/50">
                      {link.lastClickedAt ? (
                        <span>{new Date(link.lastClickedAt).toLocaleString("ru-RU", { timeZone: "Asia/Almaty" })}</span>
                      ) : (
                        <span className="text-white/20">—</span>
                      )}
                    </td>

                    {/* Actions: Copy & Visit */}
                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          onClick={() => handleCopy(link.slug)}
                          className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/15 text-xs text-white flex items-center gap-1.5 transition-all cursor-pointer"
                          title="Скопировать ссылку"
                        >
                          {copiedSlug === link.slug ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="text-emerald-400">Скопировано</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 text-white/60" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>

                        <a
                          href={`/${link.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1 rounded-lg bg-white/5 hover:bg-white/15 text-white/60 hover:text-white transition-all"
                          title="Протестировать переход"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 5. Live Click Stream ("Кто, Когда, Откуда") & Deep Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Live Click Stream (2 cols) */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>Лента переходов в реальном времени (Кто, Когда, Откуда)</span>
            </h3>
            <span className="text-xs text-muted-foreground font-mono">Последние 50 визитов</span>
          </div>

          <div className="rounded-2xl border border-white/10 overflow-hidden bg-neutral-900/40">
            {data.recentClicks.length === 0 ? (
              <div className="p-8 text-center text-sm text-white/40 flex flex-col items-center gap-2">
                <Clock className="w-6 h-6 text-white/20" />
                <span>Пока нет зафиксированных переходов.</span>
                <span className="text-xs text-white/30">
                  Попробуйте перейти по ссылке <code className="text-emerald-400">/nebuly</code> или <code className="text-emerald-400">/tempo</code>
                </span>
              </div>
            ) : (
              <div className="overflow-x-auto max-h-[480px]">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-white/5 uppercase tracking-wider text-muted-foreground sticky top-0 backdrop-blur-md border-b border-white/10">
                    <tr>
                      <th className="py-2.5 px-3">Время</th>
                      <th className="py-2.5 px-3">Ссылка</th>
                      <th className="py-2.5 px-3">Локация</th>
                      <th className="py-2.5 px-3">Устройство</th>
                      <th className="py-2.5 px-3">Источник</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {data.recentClicks.map((click) => (
                      <tr key={click.id} className="hover:bg-white/[0.02]">
                        <td className="py-2.5 px-3 text-white/50 whitespace-nowrap">
                          {new Date(click.timestamp).toLocaleTimeString("ru-RU", {
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                          })}
                        </td>
                        <td className="py-2.5 px-3 font-bold text-emerald-400 whitespace-nowrap">
                          /{click.slug}
                        </td>
                        <td className="py-2.5 px-3 font-sans text-white/90 whitespace-nowrap">
                          <span className="mr-1.5">{click.country !== "Unknown" ? click.country : "🌐"}</span>
                          <span>{click.city !== "Unknown" ? click.city : click.country}</span>
                        </td>
                        <td className="py-2.5 px-3 text-white/70 whitespace-nowrap">
                          {click.device} · {click.os} · {click.browser}
                        </td>
                        <td className="py-2.5 px-3 text-white/50 max-w-[140px] truncate" title={click.referer}>
                          {click.referer === "direct" ? "Прямой переход" : click.referer.replace(/^https?:\/\/(www\.)?/, "")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Breakdown Widgets: Top Countries & Top Sources (1 col) */}
        <div className="flex flex-col gap-6">
          {/* Top Countries */}
          <div className="p-5 rounded-2xl bg-neutral-900/60 border border-white/10 flex flex-col gap-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center justify-between">
              <span>Топ локаций</span>
              <MapPin className="w-4 h-4 text-purple-400" />
            </h4>

            {data.topCountries.length === 0 ? (
              <p className="text-xs text-white/40">Ожидание данных гео-локации...</p>
            ) : (
              <div className="flex flex-col gap-3 font-mono text-xs">
                {data.topCountries.map((c) => (
                  <div key={c.country} className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-white">
                        <span>{c.flag}</span>
                        <span>{c.country}</span>
                      </span>
                      <span className="text-white/60">{c.count} ({c.percentage}%)</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full bg-purple-500 rounded-full"
                        style={{ width: `${c.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Top Referrers */}
          <div className="p-5 rounded-2xl bg-neutral-900/60 border border-white/10 flex flex-col gap-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center justify-between">
              <span>Источники кликов</span>
              <Globe className="w-4 h-4 text-sky-400" />
            </h4>

            {data.topReferrers.length === 0 ? (
              <p className="text-xs text-white/40">Ожидание данных рефереров...</p>
            ) : (
              <div className="flex flex-col gap-3 font-mono text-xs">
                {data.topReferrers.map((r) => (
                  <div key={r.referer} className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span className="text-white truncate max-w-[160px]">{r.referer}</span>
                      <span className="text-white/60">{r.count} ({r.percentage}%)</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full bg-sky-500 rounded-full"
                        style={{ width: `${r.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
